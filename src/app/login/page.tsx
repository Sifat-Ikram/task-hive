"use client"
import { REGISTER_ROUTE } from '@/constants/routes';
import { auth } from '@/firebase/firebase';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LogIn = () => {
    const router = useRouter();
    type FieldType = {
        email?: string;
        password?: string;
    };

    const [formValues, setFormValues] = useState<FieldType>({
        email: '',
        password: ''
    });

    const handleInputChange = (fieldName: keyof FieldType, value: string) => {
        setFormValues({
            ...formValues,
            [fieldName]: value
        });
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values.email);
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then(res => {
                console.log(res);
                alert("You are logged In successfully");
                router.push('/');
            })
            .catch(err => {
                console.log(err.message);
                alert("Logging in failed!");
            })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="md:w-2/5 mx-auto mt-20 mb-10 border-[#04734C] rounded-t-lg max-md:px-8">
            <div className="bg-[#04734C] p-7 rounded-t-lg mb-8">
                <h1 className="text-5xl font-semibold text-center text-white">Login Here</h1>
            </div>
            <div className="bg-white w-full mx-auto flex flex-col lg:pl-24 md:pl-20 mb-10">
                <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email address!' },
                        ]}
                    >
                        <Input onChange={(e) => handleInputChange('email', e.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange={(e) => handleInputChange('password', e.target.value)} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='flex justify-center'>
                        <Button type="primary" style={{ backgroundColor: '#04734C', borderColor: '#04734C' }} htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <h1 className='mt-8 md:-ml-14 lg:-ml-10'>Didn't registered yet, <Link href={REGISTER_ROUTE}><span className='text-[#04734C] font-semibold'>Register</span></Link> here</h1>
            </div>
        </div>
    );
};

export default LogIn;