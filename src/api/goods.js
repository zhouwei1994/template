import {async} from '@/config/fetch';



export default {
  simulation:(val) => async('/simulation',{
      val
    },'GET',{
      load:false
    }
  ),
}
