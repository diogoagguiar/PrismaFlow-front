import React, { useEffect } from 'react';
import { Form, Input } from 'antd'; // O Button foi removido daqui
import { useSelector } from 'react-redux';
import { selectCurrentItem } from '@/redux/crud/selectors';

// O formulário agora recebe a instância 'form' e se está em modo de edição através de props.
export default function SupplierForm({ isUpdateForm = false, form }) {
    const { result: currentItem } = useSelector(selectCurrentItem);

    // O useEffect continua aqui para preencher o formulário no modo de edição
    useEffect(() => {
        if (currentItem && isUpdateForm) {
            form.setFieldsValue(currentItem);
        }
    }, [currentItem, isUpdateForm, form]);

    return (
        // A tag <Form>, onFinish e o <Button> foram removidos.
        // Retornamos apenas os campos dentro de um Fragment (<>...</>).
        <>
            <Form.Item
                label="Nome"
                name="name"
                rules={[{ required: true, message: 'Por favor, insira o nome do fornecedor!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="CNPJ" name="cnpj"><Input /></Form.Item>
            <Form.Item label="Email" name="email" rules={[{ type: 'email' }]}><Input /></Form.Item>
            <Form.Item label="Telefone" name="phone"><Input /></Form.Item>
            <Form.Item label="Endereço" name="address"><Input /></Form.Item>
        </>
    );
}