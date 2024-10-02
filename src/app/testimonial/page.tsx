import Image from 'next/image';
import profile from '../images/profile-thumbnail.png'
export default function testimonial() {
    return (
        <>
        <div className="mt-[200px] flex justify-center">
            <div className="card-content bg-white border-[1px] border-black rounded-lg border-solid w-[340px] shadow-lg p-5 justify-center"  >
                <div className="flex pb-4 pr-4">
                    <Image
                        src={profile} // Path relative to the 'public' folder
                        className="h-12 w-12 mr-4"
                        alt="Profile Picture"
                        width={48} // Desired width (in pixels)
                        height={48} // Desired height (in pixels)
                    />

                    <div className="text-left">
                        <h3 className="text-left text-lg font-semibold">Sarah Dole</h3>
                        <p className="text-sm text-neutral-600">@sarahdole</p>
                    </div>
                </div>
                <div>
                    <p className="text-base text-neutral-600">
                        I've been searching for abstract images for my design projects, and
                        I'm thrilled to have found this platform. The variety and depth of
                        creativity are astounding.
                    </p>
                </div>
            </div>
            </div>
        </>
    )
}
/* Desktop */

/* Auto layout
display: flex;
flex-direction: column;
align-items: center;
padding: 200px 0px;

position: relative;
width: 1440px;
height: 768px;
min-height: 768px;

background: linear-gradient(147.52deg, #F9FAFB 8.89%, #D2D6DB 100.48%);

*/