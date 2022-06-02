const {expect} = require('chai');


// describe("Token contract" ,function () {
//     it("Deployment should assign total supply to owner",async function(){
//         const [owner] = await ethers.getSigners();
//         console.log(" Signer object :",owner);

//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken = await Token.deploy();

//         const ownerBalance = await hardhatToken.balance(owner.address);

//         console.log("Owner Balance: ", ownerBalance);

//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     })

//     it("Should transfer tokens between accounts ",async function(){
//         const [owner,add1,add2] = await ethers.getSigners();
      

//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken = await Token.deploy();

//       // transfer 10 token from owner to add1

//         await hardhatToken.transfer(add1.address,10)

//         expect( await hardhatToken.balance(add1.address)).to.equal(10)


//       // transfer 5 token from add1 to add2

//       await hardhatToken.connect(add1).transfer(add2.address,5)

//       expect( await hardhatToken.balance(add2.address)).to.equal(5)

//   })
// })

describe('Token Contract', () => { 

    let Token;
    let hardHatToken;
    let owner;
    let add1;
    let add2;
    let adds;

    beforeEach(async () =>{
        Token = await ethers.getContractFactory("Token");
        [owner,add1,add2,...adds] = await ethers.getSigners();
        hardHatToken = await Token.deploy();
    })

    describe('Deployment', () =>{
        it("should set right owner" , async () =>{
            expect(await hardHatToken.owner()).to.equal(owner.address);
        })

        it('should assign total Token supply to owner', async () =>{
            const ownerBalance = await hardHatToken.balance(owner.address);
            expect( await hardHatToken.totalSupply()).to.equal(ownerBalance);
        })
    });
    
    describe('Transactions ', () => {
        it('should transfer token to account' , async () =>{
            await hardHatToken.transfer(add1.address,200)
            expect(await hardHatToken.balance(add1.address)).to.equal(200)
            await hardHatToken.transfer(add2.address,100)
            expect(await hardHatToken.balance(add2.address)).to.equal(100)
        })

        it(' should have enough balance to transfer' , async ()=>{
            const initialBalnce = await hardHatToken.balance(owner.address);
            await expect( hardHatToken.connect(add1).transfer(owner.address,1)).to.be.revertedWith("Not enough token");
            expect( await hardHatToken.balance(owner.address)).to.equal(initialBalnce);
        })

        it('should update balances after transfer',async () =>{
            const innitialBalnce = await hardHatToken.balance(owner.address);
            await hardHatToken.transfer(add1.address,200);
            await hardHatToken.transfer(add2.address,100);

            const finalBalnce = await hardHatToken.balance(owner.address);
            expect(finalBalnce).to.equal(innitialBalnce-300)
            expect(await hardHatToken.balance(add1.address)).to.equal(200);
            expect(await hardHatToken.balance(add2.address)).to.equal(100);
        })
    })

})