import { useLocation, useNavigate } from "react-router-dom"

export const customErrorHandler = (error) => {
    let errorMessage = ''
    if (error?.response?.data?.message) {
        errorMessage = error?.response?.data?.message
    } else if (error?.response?.data?.errMessage) {
        errorMessage = error?.response?.data?.errMessage
    } else {
        errorMessage = "something went wrong"
    }
    return errorMessage
}

// export const customStatusCodeHandler = (response) => {
//     console.log("response", response)
//     const navigate = useNavigate()
//     if (response === 40030) {
//         navigate("/home")
//     } else if (response === 400321) {
//         navigate("/home")
//     } else {
//     }
// }