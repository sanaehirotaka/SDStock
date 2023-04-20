using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;

namespace SDStock;

[ClassInterface(ClassInterfaceType.AutoDual)]
[ComVisible(true)]
public record JManager(IConfigurationRoot Configuration)
{
    public string[] List()
    {
        if (!Directory.Exists(Path.Combine(Configuration["Assets"]!, "img")))
        {
            return Array.Empty<string>(); 
        }
        return Directory.GetFiles(Path.Combine(Configuration["Assets"]!, "img"), "*", SearchOption.AllDirectories)
            .Order()
            .Select(name => Path.GetRelativePath(Configuration["Assets"]!, name).Replace('\\', '/'))
            .ToArray();
    }

    public string? Put(string group, string name, string dataUrl)
    {
        var data = dataUrl[(dataUrl.IndexOf(',') + 1)..];
        var mime = dataUrl[(dataUrl.IndexOf(':') + 1)..dataUrl.IndexOf(';')];
        var ext = Mime2Ext(mime);
        var dir = Path.Combine(Configuration["Assets"]!, "img", group);
        var path = Path.Combine(dir, $"{name}.{ext}");

        if (ext is null)
        {
            return null;
        }
        if (!Path.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
        File.WriteAllBytes(path, Convert.FromBase64String(data));
        return Path.GetRelativePath(Configuration["Assets"]!, path).Replace('\\', '/');
    }

    private string? Mime2Ext(string mime)
        => mime switch
        {
            "image/png" => "png",
            "image/jpeg" => "jpg",
            "image/webp" => "webp",
            _ => null,
        };
}
