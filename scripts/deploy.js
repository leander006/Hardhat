async function main () {
    const [deploy] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");

    const token = await Token.deploy();

    console.log("token address : ",token.address);
}

main()
    .then(()=> process.exit(0))
    .catch((error) =>{
        console.error(error);
        process.exit(1);
    })