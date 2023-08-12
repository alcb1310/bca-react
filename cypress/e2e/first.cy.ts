describe("My first test", () => {
    it("Does not do much", () => {
        expect(true).to.equal(true)
    })

    it("should fail and not let ci/cd pr merge", () => {
        expect(true).to.equal(false)
    })
})
