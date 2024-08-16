import { ChakraProvider, useToast } from "@chakra-ui/react"
import { ToastProps } from "../../types/types"
import { Button } from "@nextui-org/react"

export function Toast({ promise, label }: ToastProps) {
    const toast = useToast({
        position: 'top',
    containerStyle: {
      width: '800px',
      maxWidth: '100%'
    }})
    return (
        <ChakraProvider>
            <Button
                onClick={() => {
                    const loading = new Promise((resolve, reject) => {
                         promise(resolve, reject)
                    })
                        
                   
                    toast.promise(loading, {
                        success: { title: 'Created!', description: 'Appoitnment Created' },
                        error: { title: 'Error!', description: 'Could not create Appointment' },
                        loading: { title: 'Creating...', description: 'Please wait' },
                    })
           
                }}
            >
                {label}
            </Button>
        </ChakraProvider>
    )
}