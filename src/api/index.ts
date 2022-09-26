import axios from "axios";
import IPost from "interfaces/IPost";
import React from "react";
import { useState, useEffect } from "react";
import Feed from "pages/Feed";
import ReactDOM from "react-dom";


export const baseURL = 'http://localhost:8000/'

const http = axios.create({
    baseURL: 'http://localhost:8000/'
}); 



export const deletePostRequest = (_id:string) => {
    axios
    .delete(`${baseURL}posts/${_id}`)
    .then(() => {
        alert("Post deleted!");
    });
}
    // axios.delete(`http://localhost:8000/posts/${_id}`);
    // alert("Post deletado com sucesso!")



   
export default http
