import { useContext } from "react"
import { dataContext } from "../components/context/Context"

export const useSum = () => {
    const {itemCart, setItemCart} = useContext(dataContext)
    const totalPrice = itemCart.reduce((prev, obj) => +obj.price + +prev, 0)

    return {itemCart, setItemCart, totalPrice}
}