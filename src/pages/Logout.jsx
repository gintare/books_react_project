import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

export default function Logout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {},
  });

  const onClickHandler = () => {
    localStorage.removeItem("token");
    location.href="/authenticate";
  };

  return (
    <>
      <div className="logout-form-content">
        <form onSubmit={handleSubmit(onClickHandler)}>
          <Button variant="contained" type="submit">
            Logout
          </Button>
        </form>
      </div>
    </>
  );
}
