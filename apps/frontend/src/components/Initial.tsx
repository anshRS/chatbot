import { Button } from "@/components/ui/button"

const Initial = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl"> Hello World  </h1>      
            <p>Powered By: Next.js 14, Django, Docker</p>      
            <Button variant="outline">Get Started</Button> 
        </div>
    )
}

export default Initial
