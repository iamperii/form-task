import { useState } from 'react';
import './Form.css';

export const Form = () => {
	const [form, setForm] = useState({
		name: '',
		surname: '',
		phone: '',
		email: '',
		comment: '',
	});
	const [text, setText] = useState(false);
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};
		if (!form.name.trim()) {
			newErrors.name = 'Ad mütləqdir.';
		}
		if (!form.surname.trim()) {
			newErrors.surname = 'Soyad mütləqdir.';
		}
		if (!form.phone.trim() || !/^\+?[0-9]{10,15}$/.test(form.phone)) {
			newErrors.phone = 'Telefon düzgün formatda olmalidir (+123456789).';
		}
		if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			newErrors.email = 'Email düzgün formatda olmalidir.';
		}
		if (!form.comment.trim()) {
			newErrors.comment = 'Şərh mütləqdir.';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		e.preventDefault();
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		setErrors({ ...errors, [e.target.name]: '' });
	};

	const submitForm = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log(form);
			setText(true);
			setForm({
				name: '',
				surname: '',
				phone: '',
				email: '',
				comment: '',
			});
			setErrors({});
		} else {
			setText(false);
		}
	};

	return (
		<>
			<p className="submitMessage">{text ? 'Form uğurla göndərildi.' : ''}</p>
			<form action="" onSubmit={submitForm}>
				<label htmlFor="name">
					Ad:
					<input
						type="text"
						name="name"
						id="name"
						value={form.name}
						onChange={handleChange}
					/>
					{errors.name && <small className="error">{errors.name}</small>}
				</label>
				<label htmlFor="surname">
					Soyad:
					<input
						type="text"
						name="surname"
						id="surname"
						value={form.surname}
						onChange={handleChange}
					/>
					{errors.surname && <p className="error">{errors.surname}</p>}
				</label>
				<label htmlFor="phone">
					Telefon:
					<input
						type="text"
						name="phone"
						id="phone"
						value={form.phone}
						onChange={handleChange}
					/>
					{errors.phone && <small className="error">{errors.phone}</small>}
				</label>
				<label htmlFor="email">
					Email:
					<input
						type="email"
						name="email"
						id="email"
						value={form.email}
						onChange={handleChange}
					/>
					{errors.email && <small className="error">{errors.email}</small>}
				</label>
				<label htmlFor="comment">
					Şərh:
					<input
						type="text"
						name="comment"
						id="comment"
						value={form.comment}
						onChange={handleChange}
					/>
					{errors.comment && <small className="error">{errors.comment}</small>}
				</label>
				<button type="submit">Göndər</button>
			</form>
		</>
	);
};
