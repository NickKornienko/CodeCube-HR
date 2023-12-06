import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import DbService from "../DbService.js";
import AuthService from "../AuthService.js";

const AlignItemsList = () => {
  const [tweets, setTweets] = useState([]);
  const [empNo, setEmpNo] = useState(null);

  useEffect(() => {
    AuthService.getUserInfo().then(
      (response) => {
        setEmpNo(response.data.emp_no);
      },
      (error) => {
        console.error("Error fetching user info:", error);
      }
    );
  }, []);

  useEffect(() => {
    const loadTweets = async () => {
      try {
        const response = await DbService.getTweets();
        setTweets(response.data);
      } catch (error) {
        console.error("Error loading tweets:", error);
      }
    };
    loadTweets();
  }, []);

  const handlePostTweet = async (content) => {
    try {
      const response = await DbService.postTweet({ content });
      setTweets([...tweets, response.data]);
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      await DbService.deleteTweet(tweetId);
      setTweets(tweets.filter((tweet) => tweet.tweetId !== tweetId));
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePostTweet(e.target.elements.tweetContent.value);
          e.target.reset();
        }}
      >
        <InputBase
          name="tweetContent"
          sx={{ ml: 2, flex: 1 }}
          placeholder="What's happening?"
        />
        <IconButton type="submit" sx={{ p: 1 }}>
          <ExpandMoreIcon />
        </IconButton>
      </form>

      <List sx={{ width: "100%", maxWidth: "90%" }}>
        {tweets.map((tweet) => (
          <React.Fragment key={tweet.tweetId}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={tweet.emp_name}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {tweet.content}
                  </Typography>
                }
              />
              {/* Only show the delete button if the emp_no matches */}
              {empNo === tweet.emp_no && (
                <IconButton
                  onClick={() => handleDeleteTweet(tweet.tweetId)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default AlignItemsList;
