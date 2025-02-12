import express,{Request , Response } from "express"
import { z } from "zod"
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv"

const client = new PrismaClient()

const uniqueCode = (num : number) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let shortCode : string = "";
    for (let i : number = 0; i < num; i+=1) {
        shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return shortCode
}

export const longToShort =  async (req : Request , res : Response)   => {
    try{
        const inputSchema = z.object({
            longUrl : z.string().url(),
            customAlias : z.string().optional(),
            topic : z.string().optional()
        })

        const validSchema = inputSchema.safeParse(req.body);
        if(!validSchema.success){
            res.status(400).json({
                error : validSchema.error.format()
            })
        }
        const existUrl = await client.short.findFirst({
            where : {
                longUrl : req.body.longUrl
            },
        })

        if(existUrl){
            res.status(200).json({
                shortUrl: process.env.BASE_URL+existUrl.shortUrl,
                createdAt : existUrl.timeStamp
            })     
        }else{
        const shortUrl  = req.body.customAlias ||  uniqueCode(7)
        const store = await client.short.create({
            data : {
                longUrl : req.body.longUrl,
                shortUrl : shortUrl,
                topic : req.body.topic || null,
                timeStamp : new Date()
            }
        })
        res.status(201).json({
            shortUrl : process.env.BASE_URL+store.shortUrl,
            createdAt : store.timeStamp
        })}
    }catch(e){
        res.status(500).json({
            msg : "Server is not reachable"
        })
    }


}

export const shortToLong = async (req : Request , res : Response) => {
    try{
        const alias = req.params.alias;

        const response = await client.short.findFirst({
            where : {
                shortUrl : alias
            }
        })
        if(response){
            const userAgent = req.get('User-Agent');
            const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
            console.log(userAgent)
            console.log(ip)
            res.redirect(302,response.longUrl);
        }else{
            res.status(404).json({
                msg : "Invalid Alias Given"
            })
        }
    }catch(e){
        res.status(500).json({
            msg : "Server Internal Error"
        })
    }
}