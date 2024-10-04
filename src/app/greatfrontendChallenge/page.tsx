import Link from 'next/link';
import "../styles.css";

const navigationLink =[{name:"Testimonial Card", href:"./testimonial"},
   { name: "Newsletter Section", href:"./newsletter"}
]
export default function greatfrontendChallenge(){
    return (
        <>
            <div className="text-2xl "> Welcome to my GreatFrontend Challenge</div>
            <div className='text-sm'> Below are some challenges completed </div>
            <ul>
                {navigationLink.map((link, index) =>{
                    return(
                        <li className='text-sm m-5' style={{display: 'inline', color:'blue'}} key={index}>
                            <Link href={link.href} key={index}>{link.name}
                            </Link>
                        </li>
                    )
                })}
               
            </ul>
        </>
    )
}