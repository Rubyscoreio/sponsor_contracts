import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "solidity-docgen";

import "tsconfig-paths/register";

import "./tasks/index";

import envConfig from "./config";

const {
  DEPLOYER_KEY,
  INFURA_KEY,
  ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  POLYGONZKSCAN_API_KEY,
  BSCSCAN_API_KEY,
  BASESCAN_API_KEY,
  LINEASCAN_API_KEY,
  ZORASCAN_API_KEY,
  OPTIMIZM_API_KEY,
  SCROLLSCAN_API_KEY,
  MANTASCAN_API_KEY,
  TAIKOSCAN_API_KEY,
  BERACHAINSCAN_API_KEY,
  ARBITRUM_API_KEY,
} = envConfig;

function typedNamedAccounts<T>(namedAccounts: { [key in string]: T }) {
  return namedAccounts;
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  typechain: {
    outDir: "types/typechain-types",
  },
  networks: {
    hardhat: {
      gasPrice: "auto",
      loggingEnabled: false,
      forking: {
        url: `https://linea-mainnet.infura.io/v3/${INFURA_KEY}`,
        enabled: true,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    zkEVMMainnet: {
      url: `https://zkevm-rpc.com`,
      accounts: [DEPLOYER_KEY],
    },
    zkEVMTestnet: {
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [DEPLOYER_KEY],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [DEPLOYER_KEY],
    },
    scrollMainnet: {
      url: "https://rpc.scroll.io/",
      accounts: [DEPLOYER_KEY],
    },
    optimismMainnet: {
      url: "https://mainnet.optimism.io",
      accounts: [DEPLOYER_KEY],
    },
    optimismSepolia: {
      url: "https://sepolia.optimism.io",
      accounts: [DEPLOYER_KEY],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      chainId: 1,
      accounts: [DEPLOYER_KEY],
    },
    baseMainnet: {
      url: "https://mainnet.base.org",
      accounts: [DEPLOYER_KEY],
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [DEPLOYER_KEY],
      gasPrice: 1000000000,
    },
    baseLocal: {
      url: "http://localhost:8545",
      accounts: [DEPLOYER_KEY],
      gasPrice: 1000000000,
    },
    lineaTestnet: {
      url: `https://linea-sepolia.infura.io/v3/${INFURA_KEY}`,
      accounts: [DEPLOYER_KEY],
      chainId: 59141,
    },
    lineaMainnet: {
      url: `https://linea-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [DEPLOYER_KEY],
    },
    zoraGoerli: {
      url: "https://testnet.rpc.zora.energy/",
      accounts: [DEPLOYER_KEY],
      gasPrice: 2000000008,
    },
    zoraMainnet: {
      url: "https://zora.drpc.org",
      chainId: 7777777,
      accounts: [DEPLOYER_KEY],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      chainId: 5,
      accounts: [DEPLOYER_KEY],
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      chainId: 137,
      accounts: [DEPLOYER_KEY],
    },
    polygonMumbai: {
      url: `https://rpc-mumbai.maticvigil.com/`,
      chainId: 80001,
      accounts: [DEPLOYER_KEY],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [DEPLOYER_KEY],
    },
    bscTestnet: {
      url: "https://bsc-testnet.public.blastapi.io",
      chainId: 97,
      accounts: [DEPLOYER_KEY],
    },
    mantaMainnet: {
      url: "https://pacific-rpc.manta.network/http",
      chainId: 169,
      accounts: [DEPLOYER_KEY],
    },
    mantaTestnet: {
      url: "https://manta-testnet.calderachain.xyz/http",
      chainId: 3441005,
      accounts: [DEPLOYER_KEY],
    },
    mantleMainnet: {
      url: "https://rpc.mantle.xyz",
      chainId: 5000,
      accounts: [DEPLOYER_KEY],
    },
    mantleTestnet: {
      url: "https://rpc.sepolia.mantle.xyz",
      chainId: 5003,
      accounts: [DEPLOYER_KEY],
    },
    taikoTestnet: {
      url: "https://rpc.katla.taiko.xyz",
      chainId: 167008,
      accounts: [DEPLOYER_KEY],
    },
    taikoMainnet: {
      url: "https://rpc.mainnet.taiko.xyz",
      chainId: 167000,
      accounts: [DEPLOYER_KEY],
    },
    berachainTestnet: {
      url: "https://artio.rpc.berachain.com/",
      chainId: 80085,
      accounts: [DEPLOYER_KEY],
    },
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      chainId: 42161,
      accounts: [DEPLOYER_KEY],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
      zkEVMMainnet: POLYGONZKSCAN_API_KEY,
      zkEVMTestnet: POLYGONZKSCAN_API_KEY,
      scrollSepolia: SCROLLSCAN_API_KEY,
      scrollMainnet: SCROLLSCAN_API_KEY,
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      baseSepolia: BASESCAN_API_KEY,
      baseMainnet: BASESCAN_API_KEY,
      lineaTestnet: LINEASCAN_API_KEY,
      lineaMainnet: LINEASCAN_API_KEY,
      optimismSepolia: OPTIMIZM_API_KEY,
      optimismMainnet: OPTIMIZM_API_KEY,
      zoraGoerli: ZORASCAN_API_KEY,
      zoraMainnet: ZORASCAN_API_KEY,
      mantaMainnet: MANTASCAN_API_KEY,
      mantaTestnet: MANTASCAN_API_KEY,
      taikoTestnet: TAIKOSCAN_API_KEY,
      taikoMainnet: TAIKOSCAN_API_KEY,
      berachainTestnet: BERACHAINSCAN_API_KEY,
      arbitrum: ARBITRUM_API_KEY,
    },
    customChains: [
      {
        network: "zkEVMMainnet",
        chainId: 1101,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://explorer.mainnet.zkevm-test.net/",
        },
      },
      {
        network: "zkEVMTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com",
        },
      },
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
      {
        network: "scrollMainnet",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scrollscan.com/",
        },
      },
      {
        network: "optimismMainnet",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api",
          browserURL: "https://explorer.optimism.io",
        },
      },
      {
        network: "optimismSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io/",
        },
      },

      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "baseMainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
      {
        network: "lineaMainnet",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build/",
        },
      },
      {
        network: "lineaTestnet",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://sepolia.lineascan.build/address",
        },
      },
      {
        network: "zoraGoerli",
        chainId: 999,
        urls: {
          apiURL: "https://testnet.explorer.zora.energy/api",
          browserURL: "https://testnet.explorer.zora.energy",
        },
      },
      {
        network: "zoraMainnet",
        chainId: 7777777,
        urls: {
          apiURL: "https://explorer.zora.energy/api",
          browserURL: "https://explorer.zora.energy",
        },
      },
      {
        network: "mantaMainnet",
        urls: {
          apiURL: "https://pacific-explorer.manta.network/api",
          browserURL: "https://pacific-explorer.manta.network",
        },
        chainId: 169,
      },
      {
        network: "mantaTestnet",
        urls: {
          apiURL: "https://pacific-explorer.testnet.manta.network/api",
          browserURL: "https://pacific-explorer.testnet.manta.network",
        },
        chainId: 3441005,
      },
      {
        network: "taikoTestnet",
        urls: {
          apiURL: "https://blockscoutapi.katla.taiko.xyz/api",
          browserURL: "https://blockscoutapi.katla.taiko.xyz/",
        },
        chainId: 167008,
      },
      {
        network: "taikoMainnet",
        urls: {
          apiURL: "https://api.taikoscan.io/api",
          browserURL: "https://api.taikoscan.io/",
        },
        chainId: 167000,
      },
      {
        network: "berachainTestnet",
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/80085/etherscan",
          browserURL: "https://artio.beratrail.io",
        },
        chainId: 80085,
      },
      {
        network: "arbitrum",
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io/",
        },
        chainId: 42161,
      },
    ],
  },
  namedAccounts: typedNamedAccounts({
    deployer: 0,
    admin: "0x0d0D5Ff3cFeF8B7B2b1cAC6B6C27Fd0846c09361",
    operator: "0x381c031baa5995d0cc52386508050ac947780815",
  }),
  docgen: {
    exclude: ["./mocks"],
    pages: "files",
  },
  watcher: {
    test: {
      tasks: [{ command: "test", params: { testFiles: ["{path}"] } }],
      files: ["./test/**/*"],
      verbose: true,
    },
  },
  gasReporter: {
    enabled: !!process.env.ENABLE_GAS_REPORT,
    coinmarketcap: "4a3ee5e9-0cc5-4b90-8329-ae0e7b943075",
    currency: "USD",
    gasPrice: 0.2,
    token: "ETH",
  },
};

export default config;
