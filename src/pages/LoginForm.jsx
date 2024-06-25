
import { Controller, useForm } from "react-hook-form";
import { loginToBooks } from "../services/post";

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

       }catch(error){
         console.log(error)
       }
    }


    return (<><h1>Login form</h1>
    <form onSubmit={handleSubmit(formClickHandler)}>
        Username <br/>
        <input type="text" name="username" {...register("username")}/><br/>
        Password <br/>
        <input type="password" name="password" {...register("password")} /> <br/>
        <input type="submit" value="Submit" />
    </form></>);
}