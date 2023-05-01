import { Box, Divider, IconButton, TextField } from "@mui/material";
import { ChatCompletionRequestMessage } from "openai";
import styles from './ChatDisplay.module.scss';
import { ChatMessage } from "..";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ChatItem from "../chatItem";
import React, { ChangeEvent, MouseEventHandler } from "react";


interface ChatDisplayProps {
    messages: ChatMessage[],
    onSubmit(event: any,msgText: string): void,
}

function ChatDisplay(props: ChatDisplayProps) {
    const { messages, onSubmit } = props;
    const [prompText,setPrompText] = React.useState('');

    const handleChange = (e:any) => {
        setPrompText(e.target.value);
    }
    const handleKeydown = (e:any) => {
        if(e.key === 'Enter'){
            props.onSubmit(e,prompText);
            setPrompText('');
        } 
    }


    return (
        <Box className={styles.root}>
            <Box className={styles.displayPanel}>
                {messages.map((msg,i) => 
                    <ChatItem 
                        key={msg.index} 
                        content={msg.message.content} 
                        user={msg.message.name??'GPT'} 
                        role={msg.message.role}
                        timestamp={msg.timestamp} />
                )}
            </Box>
            <Box className={styles.proptPanel}>
                <TextField 
                    onChange={handleChange} 
                    onKeyDown={handleKeydown}
                    value={prompText}
                    fullWidth />
                <IconButton onClick={(event) => onSubmit(event,prompText)} type="button" sx={{ p: '10px' }} aria-label="search">
                    <KeyboardArrowRightIcon sx={{fontSize: '2em'}} />
                </IconButton>
            </Box>
        </Box>
    );
}


export default ChatDisplay;