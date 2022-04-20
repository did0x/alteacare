import axios from "axios";

export const toggle_loader = (data) => ({
    type: "TOGGLE_LOADER",
    data: data,
});

export const put_data = (key, data) => ({
    type: "PUT_DATA",
    key,
    data,
});

export const get_data = () => {
    return (dispatch) => {
        dispatch(toggle_loader(true));
        axios
            .get("/")
            .then((resp) => {
                dispatch(put_data("data", resp.data.data));
            })
            .catch((err) => {
                console.log(err)
            })
            .then(() => {
                dispatch(toggle_loader(false));
            });
    };
};