//NPM MODULES
import express from "express";
import dotenv  from "dotenv";
dotenv.config()


const PORT = process.env.PORT
const app = express();
app.use(express.json());

let links;

async function test(url, setings) {
    await fetch(url, setings).then((res) => {
        try {
            links.push({
                url,
                status: res.status
            });

            if (res.headers.get('Location') !== url
                && (res.status === 301
                    || res.status === 302)) {

                return test(res.headers.get('Location'), setings);

            } else {

                console.log(links);
                return links;
            }
            } catch (err) {
            console.log(err);
        }
    });
}


app.post('/urls/chechker', async (req, res) => {
    links = [];
    const { urls } = req.body;
    const data = await Promise.all(urls.map(async (url) => {
        const currUrl = url;
        const setingss = { redirect: 'manual' };
        await test(currUrl, setingss);
    })
    )


    res.send(links)
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
