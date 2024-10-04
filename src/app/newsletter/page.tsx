"use client"
import Image from 'next/image';
import checkline from '../images/checkline.svg';
import "../newsletter/newsletter.css";
import newsletterfolderimg from '../images/newletterpic.jpg';
import { useState } from 'react';

type FormValues = {
    email: string;
};
function useForm(initialValues: { email: string }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const validate = () => {
        let newErrors: any = "";
        if (!values.email) {
            newErrors = 'Email address is required';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
            newErrors = 'Please enter a valid email address';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        values,
        errors,
        handleChange,
        validate,
    };
}
export default function newsletter() {
    const { values, errors, handleChange, validate } = useForm({ email: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastHeader, setToastHeader] = useState("");
    const [toastText, setToastText] = useState("");
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (validate()) {

            try {
                const response = await fetch("https://www.greatfrontend.com/api/projects/challenges/newsletter", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: values.email }),
                });

                if (!response.ok) {
                    setToastHeader("Error");
                    setToastText(
                        "Failed to submit. Please ensure your details are correct or try again later."
                    );
                }
                else {
                    setToastHeader("Success");
                    setToastText(
                        "Subscription successful! Please check your email to confirm."
                    );
                   // setEmail("");
                }
            } catch (error) {
                setToastHeader("Success");
                setToastText(
                    "Subscription successful! Please check your email to confirm."
                );
            }
            finally { setIsLoading(false); }
        }
    }
    return (
        <>

            <section className="newsletter m-4 py-8 md:py-16 3xl:py-24 px-3 md:px-4 3xl:px-24 bg-white rounded-md shadow-soft ">
                {showToast && (
                    <div
                        className={`toast ${toastHeader === "Error" ? "error" : "success"}`}
                        onClick={() => setShowToast(false)}
                    >
                        <div className="toast__content">
                            <div className="toast__content__title">{toastHeader}</div>
                            <p className="toast__content__message text-sm">{toastText}</p>
                        </div>
                    </div>
                )}

                <div className="newsletter__content">
                    <h1 className="newsletter__title text-5xl font-semibold">
                        Get the finest curated abstracts delivered weekly to your inbox
                    </h1>
                    <ul className="newsletter__features flex flex-col gap-5" >
                        <li className="newsletter__features__feature flex items-center gap-5">
                            <Image
                                src={checkline} // Path relative to the 'public' folder
                                alt="check-fill"
                                aria-label="check-fill"
                            />

                            <span className="text-lg">
                                Exclusive access to new abstract images and collections
                            </span>
                        </li>
                        <li className="newsletter__features__feature flex items-center gap-5">
                            <Image
                                src={checkline} // Path relative to the 'public' folder
                                alt="check-fill"
                                aria-label="check-fill"
                            />

                            <span className="text-lg">
                                Unlock special promotions only for subscribers
                            </span>
                        </li>
                        <li className="newsletter__features__feature flex items-center gap-5">
                            <Image
                                src={checkline} // Path relative to the 'public' folder
                                alt="check-fill"
                                aria-label="check-fill"
                            />

                            <span className="text-lg">
                                Regular doses of artistic inspiration
                            </span>
                        </li>
                    </ul>

                    <form className="newsletter__form" onSubmit={onSubmit}>
                        <div className="newsletter__form__content">
                            <input
                                className="input__field text-sm"
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}

                                aria-describedby="email__error"
                            />
                            {errors && <span className="email__error text-sm">{errors}</span>}
                            <div className="newsletter__form__info text-base">
                                We only send you the best! No spam.
                            </div>
                        </div>
                        <div className="newsletter__form__btn">
                            <button
                                type="submit"
                                className={`text-white bg-indigo-700 hover:bg-indigo-800 shadow-soft py-[0.625rem] px-[0.875rem] rounded md:w-[8.125rem] md:h-[2.5rem] text-sm font-medium ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isLoading ? "Subscribing..." : "Subscribe"}
                            </button>
                        </div>
                    </form>
                </div>
                <Image src={newsletterfolderimg} alt="Abstraction" className="newsletter__image" />
            </section>
        </>
    )
}
