import axios from "axios";

const updateAladdinDb = async () => {
    const res = await axios.get('https://aladdin-dev.anjtechsolutions.com/api/countries');
    return res;
}

export { updateAladdinDb }