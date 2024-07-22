
import { GetContext } from "../context/createContext";
import { Product } from "../shoppingCart/types";
import {
    Container,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Typography,
    IconButton,
    Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartPage = () => {
    const { cartData, setCartData } = GetContext();

    function handleProductAdd(index: number, isAdding: boolean) {
        if (isAdding) {
            let updatedCartData: Product[] = [...cartData];
            updatedCartData[index].count += 1;
            setCartData(updatedCartData);
        } else {
            let updatedCartData: Product[] = [...cartData];
            updatedCartData[index].count -= 1;
            setCartData(updatedCartData);
        }

    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Cart Page
            </Typography>
            {cartData.length === 0 ? (
                <Typography variant="body1" style={{ textAlign: "center" }}>
                    Your cart is empty.
                </Typography>
            ) : (
                <List>
                    {cartData.filter((product) => product.count > 0).map((product, index) => (
                        <ListItem key={product.id} disableGutters style={{ padding: "16px 0" }}>
                            <Avatar src={product.image} alt={product.title} variant="rounded" style={{ marginRight: "16px" }} />
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        {product.title}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body2" color="textPrimary" style={{ fontWeight: "bold" }}>
                                            ₹{product.price} X {product.count}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Total: ₹{(product.price * product.count).toFixed(2)}
                                        </Typography>
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="remove" onClick={() => handleProductAdd(index, false)}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="add" onClick={() => handleProductAdd(index, true)}>
                                    <AddIcon />
                                </IconButton>

                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default CartPage;
