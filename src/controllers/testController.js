function testUserController(req, res) {
    try {
        res.status(200).send({
            success: true,
            message: 'test user data API',
        });
    } catch (error) {
        // console.log('inside catch of testUserController:'.bgRed.white.bold, error);
        console.log(`Server Running on`.bgMagenta.white.italic);
    }
}

export {testUserController};
