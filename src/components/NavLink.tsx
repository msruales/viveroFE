import {Link, LinkProps, useMatch, useResolvedPath} from "react-router-dom";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

interface NavLinkProps extends LinkProps {
    open: boolean,
    name: string,
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }
}

export const NavLink = ({to, open, Icon, name, ...props}: NavLinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return (
        <div>
            <Link

                style={{textDecoration: match ? "underline" : "none"}}
                to={to}
                {...props}
            >
                <ListItemButton
                    selected={Boolean(match)}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon/>
                    </ListItemIcon>
                    <ListItemText primary={name} sx={{opacity: open ? 1 : 0}}/>
                </ListItemButton>
            </Link>
        </div>
    );
}

export default NavLink
