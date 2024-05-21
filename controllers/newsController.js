
exports.getNews = async (req, res) => {
    try {
        const { user: userPassed, message: messagePassed } = req
        if (userPassed) {
            const userPresent = await User.findById(userPassed.id);
            if (userPresent) {
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.News_API_KEY}`);
                return res.status(200).send({ result: true, data: response.data });
            } else {
                return res.status(401).send({ result: false, message: messagePassed });
            }
        }
    } catch (error) {
        return res.status(500).send({ result: false, message: "something want wrong" });
    }
}
