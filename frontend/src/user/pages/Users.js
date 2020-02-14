import React, { useEffect, useState } from 'react';

import UsersList from "../components/UsersList"
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/Spinner/LoadingSpinner"
import { useHttpClient } from '../../shared/hooks/http-hook'

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [loadedUsers, setloadedUsers] = useState()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users')
                setloadedUsers(responseData.users)
            } catch (err) { }
        }
        fetchUsers()
    }, [sendRequest])

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className="center">
                <LoadingSpinner />
            </div>}
            {!isLoading && loadedUsers && <UsersList item={loadedUsers} />}
        </>
    )
}

export default Users