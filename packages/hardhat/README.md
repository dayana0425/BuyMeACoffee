

### COMMANDS - Execute from the root directory. 
#### Before deploying your smart contracts, you have to compile:
```
yarn compile
```
#### Deploy to Polygon Mumbai testnet:
```
yarn deploy
```
### [Verify Smart Contract on Polygonscan using Hardhat](https://coinsbench.com/verify-smart-contract-on-polygonscan-using-hardhat-9b8331dbd888)

```
cd packages/hardhat
yarn hardhat verify <DIRECCION DEL CONTRATO> --network mumbai
```
#### You should get this output:
![Figure 1](../../images/VerifyPolygonScan.png)
