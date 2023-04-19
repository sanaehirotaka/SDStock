using Microsoft.Extensions.Configuration;
using System.Runtime.InteropServices;

namespace SDStock;

[ClassInterface(ClassInterfaceType.AutoDual)]
[ComVisible(true)]
public record JManager(IConfigurationRoot Configuration)
{
}
