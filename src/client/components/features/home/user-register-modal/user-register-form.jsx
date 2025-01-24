"use client";

import styles from "./user-register-form.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import FormWrapper from "@/client/components/features/home/user-register-modal/sub-components/form-wrapper/form-wrapper";
import UserNameInput from "@/client/components/features/home/user-register-modal/sub-components/user-name-input/user-name-input";
import UserLogoutButton from "@/client/components/features/home/user-register-modal/sub-components/user-logout-button/user-logout-button";
import UserRegisterButton from "@/client/components/features/home/user-register-modal/sub-components/user-register-button/user-register-button";
import UserRegisterFormContextProvider
    from "@/client/components/features/home/user-register-modal/context/user-register-form-context";
import FormError from "@/client/components/features/home/user-register-modal/sub-components/form-error/form-error";

export default function UserRegisterForm() {
    return <UserRegisterFormContextProvider>
        <ContainerElement>
            <FormWrapper>
                <UserNameInput />
                <ContainerElement className={styles.userRegisterForm_buttonsContainer}>
                    <UserRegisterButton />
                    <UserLogoutButton/>
                </ContainerElement>
            </FormWrapper>
            <FormError />
        </ContainerElement>
    </UserRegisterFormContextProvider>
}