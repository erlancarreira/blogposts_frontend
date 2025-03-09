import Toast from "react-native-toast-message";

export function toastSuccess(message: string) {
    Toast.show({
        type: "success", // "success" | "error" | "info"
        text1: message,
    })
}

export function toastError(message: string) {
    Toast.show({
        type: "info", // "success" | "error" | "info"
        text1: message,
    })
}