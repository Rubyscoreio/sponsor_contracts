// SPDX-License-Identifier: MIT

pragma solidity 0.8.21;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

struct SponsorData {
    bytes32 sponsorId;
    address sponsor;
    bool isPaid;
    uint256 amountThreshold;
    uint256 amount;
}

contract Rubyscore_Sponsor_Deposit is AccessControl, ReentrancyGuard, EIP712 {
    using SafeERC20 for IERC20;

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    string public constant NAME = "Rubyscore_Sponsor";
    string public constant VERSION = "0.0.1";
    IERC20 public token;


    uint256 private communityBalance;
    uint256 private protocolBalance;

    mapping(bytes32 sponsorId => SponsorData data) public sponsors;

    event SetSponsor(bytes32 indexed sponsorId, uint256 indexed amount);
    event SponsorshipPayment(bytes32 indexed sponsorId, address indexed sponsor, uint256 communityAmount, uint256 protocolAmount);
    event UserReward(address indexed to, uint256 indexed amount);
    event Withdraw(address indexed to, uint256 indexed amount);

    function getCommunityBalance() external view returns (uint256) {
        return communityBalance;
    }

    function getProtocolBalance() external view returns (uint256) {
        return protocolBalance;
    }

    constructor(address _admin, address _operator, IERC20 _token) EIP712(NAME, VERSION) {
        require(_admin != address(0), "Zero address check");
        require(_operator != address(0), "Zero address check");
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(OPERATOR_ROLE, _operator);

        token = _token;
    }

    function sponsorshipPayment(bytes32 _sponsorId, uint256 _amount, bytes calldata _operatorSignature) external {
        require(_amount > 0, "Amount should equal highest zero");

        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("SponsorshipParams(bytes32 sponsorId,address sponsor)"),
                    _sponsorId,
                    msg.sender
                )
            )
        );

        _checkRole(OPERATOR_ROLE, ECDSA.recover(digest, _operatorSignature));

        uint256 part20 = (_amount * 20) / 100;
        uint256 part80 = _amount - part20;

        communityBalance += part20;
        protocolBalance += part80;

        SponsorData storage sponsorData = sponsors[_sponsorId];
        sponsorData.sponsor = msg.sender;
        sponsorData.amount += _amount;

        if (sponsorData.amount >= sponsorData.amountThreshold) {
            sponsorData.isPaid = true;
        }

        token.safeTransferFrom(msg.sender, address(this), _amount);

        emit SponsorshipPayment(_sponsorId, msg.sender, part20, part80);
    }

    function setSponsor(string memory _name, uint256 _amountThreshold) external onlyRole(OPERATOR_ROLE) {
        bytes32 sponsorId = _generateSponsorId(_name);
        sponsors[sponsorId] = SponsorData(
        sponsorId,
        address(0),
        false,
        _amountThreshold,
        uint256(0)
        );

        emit SetSponsor(sponsorId, _amountThreshold);
    }

    function userReward(address _to, uint256 _amount) external onlyRole(OPERATOR_ROLE) {
        _usersReward(_to, _amount);
    }

    function usersReward(address[] calldata _users, uint256[] calldata _amounts) external onlyRole(OPERATOR_ROLE) {
        require(_users.length == _amounts.length, "Lists length is not valid");
        for(uint256 i = 0; i < _users.length; i++) {
            uint256 amount = _amounts[i];
            address recipient = _users[i];

            _usersReward(recipient, amount);
        }
    }

    function _usersReward(address _to, uint256 _amount) private {
        require(communityBalance >= _amount, "Insufficient funds");

        token.safeTransfer(_to, _amount);
        communityBalance -= _amount;

        emit UserReward(_to, _amount);
    }

    function withdraw(address _to, uint256 _amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(protocolBalance >= _amount, "INSUFFICIENT_BALANCE");

        token.safeTransfer(_to, _amount);
        protocolBalance -= _amount;

        emit Withdraw(_to, _amount);
    }

    function _generateSponsorId(string memory _sponsorName) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(_sponsorName));
    }
}
