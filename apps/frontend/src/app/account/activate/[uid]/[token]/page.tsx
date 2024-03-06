'use client'

import { Button } from '@/components/ui/button'
import axios from '@/utils/axios'
import { Envelope } from '@phosphor-icons/react'
import React, { useState } from 'react'

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { ExclamationTriangleIcon, InfoCircledIcon, UpdateIcon } from '@radix-ui/react-icons'


const ActivationPage = ({ params }: {
    params: {
        uid: string,
        token: string
    }
}) => {

    const [server_error, setServerError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAccountActivation = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/auth/users/activation/", {
                uid: params.uid,
                token: params.token
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setMessage("Your account has been successfully activated. You may now close this page.")
            setServerError(null);
        } catch (error) {  
            setServerError("Invalid activation link. Please try again or request a new activation email.")
            setMessage(null);
        } finally {
            setLoading(false);
        } 
    }

    return (
        <div className='flex-1 flex flex-col items-center justify-center p-2'>
            <div>
                {server_error && (
                    <Alert variant="destructive" className='mb-5'>
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {server_error}
                        </AlertDescription>
                    </Alert>
                )}

                {message && (
                    <Alert variant="success" className='mb-5'>
                        <InfoCircledIcon className="h-4 w-4" />
                        <AlertTitle>Info</AlertTitle>
                        <AlertDescription>
                            {message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            <div className='flex flex-col items-center justify-center border p-3 md:p-5 rounded-xl text-center gap-3'>
                <Envelope className='h-20 w-20' />
                <h1 className='text-2xl font-bold'>Activate your account</h1>
                <p>To start using ChatDroid, you need to activate your account.</p>
                <Button onClick={handleAccountActivation} className='uppercase'  disabled={loading}>
                    {loading && <UpdateIcon className='animate-spin h-4 w-4 mr-2' />}
                    Click To Activate
                </Button>

            </div>

        </div>
    )
}

export default ActivationPage
