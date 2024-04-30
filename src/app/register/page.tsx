"use client"
import { LOGIN_ROUTE } from '@/constants/routes';
import { auth } from '@/firebase/firebase';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Register = () => {
    const router = useRouter();
    type FieldType = {
        displayName?: string;
        email?: string;
        password?: string;
    };

    const [formValues, setFormValues] = useState<FieldType>({
        displayName: '',
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
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(res => {
                console.log("user", res.user);
                alert("You are registered successfully");
                router.push('/');
            })
            .catch(err => {
                console.log("Error", err.message);
            })

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="md:w-3/5 mx-auto mt-20 mb-10 border-[#04734C] border-b-8 rounded-b-lg rounded-t-lg">
            <div className="bg-[#04734C] p-7 rounded-t-lg mb-8">
                <h1 className="text-5xl font-semibold text-center text-white">Register Here</h1>
            </div>
            <div className="bg-white w-4/5 mx-auto flex flex-col lg:pl-36 md:pl-20">
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
                    <Form.Item<FieldType>
                        label="Username"
                        name="displayName"
                        rules={[{ message: 'Please input your username!' }]}
                    >
                        <Input className='w-full' onChange={(e) => handleInputChange('displayName', e.target.value)} />
                    </Form.Item>
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

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" style={{ backgroundColor: '#04734C', borderColor: '#04734C' }} htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <h1>Already have an account, <Link href={LOGIN_ROUTE}><span className='text-[#04734C] font-semibold'>Login</span></Link> here</h1>
            </div>
        </div>
    );
};

export default Register;
