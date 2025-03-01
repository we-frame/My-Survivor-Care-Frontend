import parse, { DOMNode, domToReact } from "html-react-parser";
import Tooltip from "./Tooltip";
import { CircleHelp } from "lucide-react";
import { type ReactNode } from "react";
import Link from "next/link";
// Adjust the import path

function CustomTooltip({ children }: { children: ReactNode }) {
  return (
    <Tooltip content={children}>
      <CircleHelp color="#374151" size={20} className="cursor-pointer -mb-1" />
    </Tooltip>
  );
}

function processTooltips(content: string) {
  // Regular expression to match <tooltip>...</tooltip> tags
  // Using non-greedy matching with .*? to handle multiple tooltips
  const tooltipRegex = /&lt;tooltip&gt;([\s\S]*?)&lt;\/tooltip&gt;/g;

  // Replace all tooltip tags with CustomTooltip components
  const processedContent = content.replace(
    tooltipRegex,
    (match, tooltipText) => {
      // Escape any special characters in the tooltip text to prevent issues
      // when inserting into JSX/React components
      const sanitizedTooltipText = tooltipText
        .trim()
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

      // Return the CustomTooltip component with the extracted text
      return `<CustomTooltip>${sanitizedTooltipText}</CustomTooltip>`;
    }
  );

  return processedContent;
}

export function RenderHtml({ html }: { html: string }) {
  let content = processTooltips(html);
  return parse(content, {
    replace: (domNode) => {
      // Check if the node is a <span> with specific attributes
      if (domNode.type === "tag" && domNode.name === "a") {
        // Convert the span's content to React elements

        // Replace with CustomTooltip, passing the content as children
        return (
          <Link
            href={domNode?.attribs?.href}
            target={domNode.attribs?.target}
            className="underline inline-block text-[#14b8a6]">
            {domToReact(domNode.children as DOMNode[])}
          </Link>
        );
      } else if (domNode.type === "tag" && domNode.name === "customtooltip") {
        // Convert the span's content to React elements

        // Replace with CustomTooltip, passing the content as children
        return (
          <CustomTooltip>
            <span>{domToReact(domNode.children as DOMNode[])}</span>
          </CustomTooltip>
        );
      }
    },
  });
}
