import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const  peristAtom  = recoilPersist().persistAtom
export const loggedInUserState = atom({
    key: 'loggedInUserState',
    default: {
        name: "robert"
    },
    effects_UNSTABLE: [peristAtom],

})

export const menuState = atom({
    key : 'menuState',
    default : 'home',
    effects_UNSTABLE: [peristAtom],
})

export const postNewTokoTrigger = atom({
    key : 'postNewTokoTrigger',
    default : 0,
})

export const postNewDorayakiTrigger = atom({
    key : 'postNewDorayakiTrigger',
    default : 0,
})

export const selectorUserState = selector({
        key: 'charCountState', // unique ID (with respect to other atoms/selectors)
        get: ({get}) => {
          const text = get(loggedInUserState)
            return text.name;
        },
    });

