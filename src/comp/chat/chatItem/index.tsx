import { Box, Divider, Typography } from "@mui/material";
import clsx from "clsx";
import React, { FC } from "react";
import { JsxElement } from "typescript";
import styles from './ChatItem.module.scss';

interface ChatItemProps{
    content: string,
    user: string,
    timestamp: Date,
    role: string
}


function ChatItem(props:ChatItemProps){
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' , hour12:true };
    const formattedDate = props.timestamp.toLocaleString('en-US', options);
    const isResponse:boolean = (props.role !== 'user');
    return (
        <div className={clsx({
                [styles.root]:true,
                [styles.contentRight]:!isResponse
            })}>
            <div className={styles.user}>
                <Typography>
                    {props.user}
                </Typography>
            </div>
            <div 
                className={clsx({
                    [styles.content]: true
                })}>
                <div className={styles.bubble}>
                    <Typography>
                        {props.content}
                    </Typography>
                </div>
                <Divider hidden/>
                <div className={styles.timestamp}>
                    {formattedDate}
                </div>
            </div>
        </div>
    );
}

export default ChatItem;