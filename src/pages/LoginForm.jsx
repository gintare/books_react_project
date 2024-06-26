
import { Controller, useForm } from "react-hook-form";
import { loginToBooks } from "../services/post";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
      } = useForm({
        defaultValues: {
          username: "",
          password: "",
        },
      });

    const formClickHandler = async(data) => {
       console.log(data);
       try{
          const token = await loginToBooks(data);
          if(!token) throw new Error("No login success");
          console.log(token.accessToken);
          localStorage.setItem("token", token.accessToken);
          location.href="/";
       }catch(error){
         console.log(error)
       }
    }


    return (<><h1>Login form</h1>
    <div className="login-submit-form-content">
    <form onSubmit={handleSubmit(formClickHandler)}>
        {/* Username <br/>
        <input type="text" name="username" {...register("username")}/><br/> */}
        <TextField id="filled-basic" label="Username" variant="filled" {...register("username")}/><br/>
        {/* Password <br/>
        <input type="password" name="password" {...register("password")} /> <br/> */}
        <TextField id="filled-basic1" label="Password" type="password" variant="filled" {...register("password")}/><br/>
        {/* <input type="submit" value="Submit" /> */}
        <Button variant="contained" type="submit">Login</Button>
    </form>
    </div></>);
}