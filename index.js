import Twitter from "twitter";
import dotenv from "dotenv";
dotenv.config();

const TWITTER_URL = "https://twitter.com/";

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

client.get("search/tweets", { q: "#buildinpublic" }, (error, tweets, _) => {
    if (error) {
        console.error(error);
    }
    console.log(
        tweets.statuses
            .filter((tweet) => {
                return tweet.user.followers_count < 600 && !tweet.retweeted_status && !tweet.in_reply_to_status_id;
            })
            .map((tweet) => ({
                user_link: TWITTER_URL + tweet.user.screen_name,
                tweet_link: TWITTER_URL + tweet.user.screen_name + "/status/" + tweet.id_str,
                text: tweet.text,
                followers_count: tweet.user.followers_count,
            }))
    );
});
