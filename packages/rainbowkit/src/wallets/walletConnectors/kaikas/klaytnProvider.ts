import { providers } from 'ethers'

export class KlaytnProvider extends providers.Web3Provider{
    send(method: string, params: Array<any>): Promise<any> {
        method = method.replace("eth", "klay")
        if(method=="personal_sign"){
            return window.caver?.klay.sign(params[0], params[1])
        }
        return this.jsonRpcFetchFunc(method, params);
    }
}