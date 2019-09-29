// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var SquareVerifier = artifacts.require('Verifier')
const truffleAssert = require('truffle-assertions')

contract('TestSquareVerifier', accounts => {
    
    let proofFromZokrats = require("../../zokrates/code/square/proof.json");
    const owner = accounts[0]


    beforeEach(async function (){
        this.contract = await SquareVerifier.new({from: owner})
    })

    // Test verification with correct proof
    // - use the contents from proof.json generated from zokrates steps
    it('Test verification with correct proof', async function() {
        
        //console.log(proof)
        const  {
            proof : {a,b,c},
            inputs : inputs
        } = proofFromZokrats

        let result = await this.contract.verifyTx.call(a, b, c, inputs, {from: owner});

        assert.equal(true, result, "Invalid proof result");

    })
    
    // Test verification with incorrect proof
    it('Test verification with incorrect proof', async function() {

        let  {
            proof : {a,b,c},
            inputs : inputs
        } = proofFromZokrats

        // Change the inputs to false the verification
        inputs = ["0x1000000000000000000000000000000000000000000000000000000000000009", "0x1000000000000000000000000000000000000000000000000000000000000001"]

        let result = await this.contract.verifyTx.call(a, b, c, inputs, {from: owner})

        assert.equal(false, result, "Invalid proof result");

    })


})


