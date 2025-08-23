import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import * as React from "react";

const page = () => {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  return (
    <div className="flex ">
      <ScrollArea className="h-[80vh] w-48 rounded-md border ">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="w-full h-[80vh] rounded-md border ">
        <pre className="bg-primary-foreground text-wrap p-7 leading-7 text-justify selection:bg-secondary">
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          "pof ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          ducimus ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          ducimus ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          ducimus ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          ducimus ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          ducimus ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          ducimus ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          ducimus ew[pkfwe ffwefjow] Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit eligendi amet animi. Delectus aut rem minus!
          Minus temporibus dolorum ad, quis exercitationem eius odit eveniet
          ducimus explicabo saepe necessitatibus error?
        </pre>
      </ScrollArea>
    </div>
  );
};
export default page;
