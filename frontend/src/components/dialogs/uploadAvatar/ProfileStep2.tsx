type Props = {
  setStep: (step: number) => void;
  selectedFile:File
};
export const ProfileStep2 =({setStep, selectedFile }: Props)=>{
    return(
        <article className="p-4 bg-neutral-900">
            <img 
                className="border-3 border-blue-500"
                src={URL.createObjectURL(selectedFile)}
                alt="Uploaded image" 
            />
        </article>
    )
}