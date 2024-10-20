import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const detailsAtom=atom({
    key:"detailsatom",
    default:{},
    effects_UNSTABLE: [persistAtom],
})