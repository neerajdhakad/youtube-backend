import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req,res)=>{
    // Algorithm -> get details from the frontend (req.body)
    // validation (all the validations on both frontend and backend)
    // check if user already exist - (email or username)
    // check for images and for avatar
    // upload them on coudinary, avatar
    // create user object - create entry in db
    // remove password and referesh token field from response
    // check for user creation
    // return response

    // If data is coming from form/json then use req.body
    // object destructuring
    const {username,fullName,email,password}=req.body

    if(
        //This will return true if any field is empty
        [username,fullName,email,password].some((field)=>(field?.trim()===""))
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with this email or username already Exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    // uploading on server takes time that's why we use await
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({
        username: username.toLowercase(),
        fullName,
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || ""
    })

    //check user is created or not and in the response what we don't want
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully!")
    )


})

export {registerUser}