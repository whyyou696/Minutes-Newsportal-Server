module.exports = class HelloController{
    static async getHello (req,res) {
        res
        .status(200)
        .json({message: "Hello World"})
    }
}