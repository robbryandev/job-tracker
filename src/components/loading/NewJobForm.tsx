import { TextInput } from "@/components/ui/TextInput";
import { Button } from "@/components/ui/Button";

export default function NewJobForm() {
  return (
    <div className="h-full w-full rounded-md shadow-md">
      <form className="mx-auto h-full w-10/12">
        <div className="mx-auto flex h-full flex-col space-y-8 p-4">
          <h3 className="pl-2 text-2xl font-medium">New Job</h3>
          <div>
            <TextInput label="Company" name="company" id="company" disabled />
          </div>
          <div>
            <TextInput
              label="Application Date"
              name="company"
              id="company"
              disabled
            />
          </div>
          <Button
            className="animate-pulse cursor-not-allowed bg-neutral-700"
            type="button"
            variant={"default"}
          ></Button>
        </div>
      </form>
    </div>
  );
}
