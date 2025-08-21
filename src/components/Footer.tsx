import ModeToggle from "./ModeToggle";

function Footer() {
    return (
        <div className="flex flex-col gap-8 justify-center border-t  py-4 container-px">
            <ModeToggle />
            <div className="text-neutral-500 flex flex-col gap-2">
                <p className="">Copyright © null</p>
                <p>
                    <a href="/privacy-policy" className="hover:underline">
                        Privacy Policy
                    </a>
                </p>
                <p>
                    <a href="/terms-of-service" className="hover:underline">
                        Terms of Service
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Footer;
