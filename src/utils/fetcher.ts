import axios from 'axios';


// SWR에서 첫번쟤 변수로 받은애를 두반째  fetcher 파라미터로 넘겨줌
const fetcher = (url: string) => axios.get(url, {
    withCredentials: true, // 도메인이 다를경우 쿠키를 내려주지도 보내지도 못하는데 해당 설정을하면 보내주고 받는게 가능하다.
}).then(response => response.data);

export default fetcher;
