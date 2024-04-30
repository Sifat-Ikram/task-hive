"use client"
import { REGISTER_ROUTE } from '@/constants/routes';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const Login = () => {
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
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="w-3/5 mx-auto mt-20 mb-10 border-[#04734C] border-b-8 rounded-b-lg rounded-t-lg">
            <div className="bg-[#04734C] p-7 rounded-t-lg mb-8">
                <h1 className="text-5xl font-semibold text-center text-white">Login Here</h1>
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
                        label="Email"
                        name="email"
                        rules={[{ message: 'Please input your email!' }]}
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
                <h1>Didn't registered yet, <Link href={REGISTER_ROUTE}><span className='text-[#04734C] font-semibold'>Register</span></Link> here</h1>
            </div>
        </div>
    );
};

export default Login;