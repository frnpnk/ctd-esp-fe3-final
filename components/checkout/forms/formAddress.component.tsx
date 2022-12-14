import { Box, Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTexInput from "dh-marvel/components/checkout/controlledTexInput";
import { FormContext } from "dh-marvel/components/checkout/context/FormContext";
import  useOrder  from "dh-marvel/components/checkout/context/useOrder";

export const addressSchema = yup
  .object({
    address1: yup
      .string()
      .required("Su direccion es requerida")
      .min(3, "Su nombre debe tener al menos 3 caracteres"),
    address2: yup.string().optional(),
    city: yup
      .string()
      .required("Su ciudad es requerida")
      .min(3, "Su ciudad debe tener al menos 3 caracteres"),
    state: yup
      .string()
      .required("Su provincia es requerida")
      .min(3, "Su provincia debe tener al menos 3 caracteres"),
    zipCode: yup
      .string()
      .required("Su codigo postal es requerido")
      .min(3, "Su codigo postal debe tener al menos 3 caracteres"),
  })
  .required();

export type addressFormData = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
};

const AddressForm: FC = () => {
  const { state, dispatch } = useOrder();

  const methods = useForm<addressFormData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      address1: "calle siempreviva",
      address2: "",
      city: "sin city",
      state: "sin state",
      zipCode: "6666",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const { activeStep, setActiveStep } = useContext(FormContext);

  const onSubmit = (data: addressFormData) => {
    dispatch({
      type: "SET_ADDRESS",
      payload: data,
    });
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  useEffect(() => {
    setFocus("address1");
  });
  
  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  return (
    <Stack>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box maxWidth={800}>
          <Grid container spacing={2} padding={"20px"}>
            <Grid item xs={7}>
              <ControlledTexInput
                name="address1"
                defaultValue=""
                label="direccion"
              />
            </Grid>

            <Grid item xs={4}>
              <ControlledTexInput
                name="address2"
                defaultValue=""
                label="departamento"
              />
            </Grid>

            <Grid item xs={11}>
              <ControlledTexInput name="city" defaultValue="" label="ciudad" />
            </Grid>
            <Grid item xs={7}>
              <ControlledTexInput
                name="state"
                defaultValue=""
                label="provincia"
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTexInput
                name="zipCode"
                defaultValue=""
                label="codigo postal"
              />
            </Grid>
          </Grid>
          </Box>
          <Stack direction="row" mt={2}>
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Atras
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              variant="contained"
      
              onClick={handleSubmit(onSubmit)}
              sx={{ mr: 1 }}
            >
              Siguiente
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default AddressForm;
